import scrapy
from backend.src.database import client

class EasychairSpider(scrapy.Spider):
    name = "easychair"
    allowed_domains = ["easychair.org"]
    start_urls = [
        'https://easychair.org/cfp/topic.cgi?tid=670',
    ]

    def __init__(self, database_name):
        self.db = client[database_name]

    def parse(self, response):
        rows = response.css('tr.yellow')
        for row in rows:
            conference = {
                'name': row.css('td:nth-child(2)::text').get(),
                'location': row.css('td:nth-child(3)::text').get(),
                'deadline': row.css('td:nth-child(4) span::text').get(),
                'start_date': row.css('td:nth-child(5) span::text').get(),
                'details_link': row.css('td:nth-child(1) a::attr(href)').get()
            }
            details_link = conference['details_link']
            if details_link:
                yield response.follow(details_link, self.parse_conference_details, meta={'conference': conference})
    
    def parse_conference_details(self, response):
        conference = response.meta['conference']
        conference['details'] = response.css('#cfp').get()
        image_link = response.xpath('//td[contains(@class,"logocell")]').xpath('img/@src').get()
        if image_link:
            conference['image_link'] = f'https://easychair.org/{image_link}'
        links = response.css("a::text").getall()
        if len(links) >= 3:
            conference['conference_link'] = links[2]
        yield conference
