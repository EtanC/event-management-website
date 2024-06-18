import scrapy

class EasychairSpider(scrapy.Spider):
    name = "easychair"
    allowed_domains = ["easychair.org"]
    start_urls = [
        'https://easychair.org/cfp/topic.cgi?tid=18115',
    ]

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
                yield response.follow(details_link, self.parse_details, meta={'conference': conference})
    
    def parse_details(self, response):
        conference = response.meta['conference']
        details = ' '.join(response.css('p::text').getall())
        conference['details'] = details
        yield conference
