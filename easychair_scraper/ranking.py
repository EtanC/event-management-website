import pandas
import re
import json
import string

DEBUG = False

def test_ranking():
    rank = Ranking(NameProcessor())
    rank.icore_to_ranking_map('./backend/src/ranking_data/CORE.csv')
    with open('./backend/easychair_scraper/output.json') as FILE:
        data = json.load(FILE)
        for item in data:
            result = rank.rank_event(item['name'])

class Ranking:
    def __init__(self, name_processor):
        self.icore_data = pandas.DataFrame()
        self.ranking_to_number = {
            'C': 1,
            'B': 2,
            'A': 3,
            'A*': 4,
        }
        self.name_processor = name_processor

    def icore_to_ranking_map(self, path):
        '''
        Given the path to a csv file exported from the website
        https://portal.core.edu.au/conf-ranks/?search=&by=all&source=all&sort=atitle&page=1
        returns a dictionary that maps an event to their ranking
        '''
        self.icore_data = pandas.read_csv(path)

    def search_for_conference(self, event_name):
        result = self.icore_data
        for word in event_name.split(' '):
            result = result[result['Conference name'].str.contains(word, regex=False)]
            if len(result) == 0:
                return result
        return result

    def rank_event(self, event_name):
        real_event_name = self.name_processor.preproccess_event_name(event_name)
        result = self.search_for_conference(real_event_name)
        if len(result) == 0:
            if DEBUG == True:
                print('No match')
            return 0
        if DEBUG == True:
            print('YES match')
            print(result['Rank'])
        return self.get_first_non_zero_rank(result['Rank'])

    def get_first_non_zero_rank(self, ranks):
        number_rank = 0
        for ranking in ranks:
            number_rank = self.ranking_to_number.get(ranking, 0)
            if number_rank != 0:
                return number_rank
        return number_rank

class NameProcessor:
    def __init__(self):
        self.uselessWords = ['a', 'an', 'or', 'the', 'of', 'in', 'on', 'for', 'x', 'and']

    def preproccess_event_name(self, event_name):
        result = event_name
        result = self.remove_punctuation(result)
        result = self.remove_year_qualifiers(result)
        result = self.remove_edition_qualifiers(result)
        result = self.remove_bracket_info(result)
        result = self.remove_useless_words(result)
        result = self.clean_up_spaces(result)
        return result

    def remove_punctuation(self, event_name):
        # Replace punctuation with spaces so they dont mess up the search
        return str.translate(event_name, str.maketrans(string.punctuation, ' ' * len(string.punctuation), ))

    def remove_year_qualifiers(self, event_name):
        # Remove any sequence of exactly four consecutive numbers, because its unlikely that its part of the title
        return re.sub(r'\b[0-9]{4}\b', '', event_name)

    def remove_edition_qualifiers(self, event_name):
        # Remove any sequence of 3 or less consecutive numbers followed by "th" (case insensitive)
        # Because it is unlikely part of the title
        return re.sub(r'\b[0-9]{,3}th\b', '', event_name, flags=re.IGNORECASE)

    def remove_bracket_info(self, event_name):
        # Wikicfp sometimes adds info to the title in brackets, we remove them because it messes with our search
        return re.sub(r'\(.*\)', '', event_name, flags=re.IGNORECASE)
    
    def remove_useless_words(self, event_name):
        # Some words like "The" or "and" aren't key words we need to search up, so we remove them
        result = event_name
        for word in self.uselessWords:
            result = re.sub(fr'\b{word}\b', '', result, flags=re.IGNORECASE)
        return result

    def clean_up_spaces(self, event_name):
        # Ensure there is only 1 space in between each word, and no spaces at the start and end of title
        return re.sub(r' {2,}', ' ', event_name).strip()
    
if __name__ == '__main__':
    DEBUG = True
    test_ranking()