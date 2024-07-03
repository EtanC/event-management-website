# -*- coding: utf-8 -*-
import scrapy
import re

class EasychairSpider(scrapy.Spider):
    name = 'wikicfp'
    allowed_domains = ['wikicfp.com']
    start_urls = ['http://www.wikicfp.com/cfp/allcfp?page=1']

    def parse(self, response):
        table = response.css('.contsec table > tr:nth-child(3) table')
        for even_rows, odd_rows in zip(table.css("table > tr:not(tr:nth-child(1)):nth-child(2n)"), table.css("table > tr:not(tr:nth-child(1)):nth-child(2n+1)")):
            conference_deets = {
                'name': even_rows.css("td:nth-child(2)::text").get(),
                'start_date': self.get_start_date(odd_rows.css("td:nth-child(1)::text").get()),
                'location': odd_rows.css("td:nth-child(2)::text").get(),
                'deadline': odd_rows.css("td:nth-child(3)::text").get(),
            }
            conference_deets['details_link'] = even_rows.css("td:nth-child(1) > a::attr(href)").get()
            if conference_deets['details_link']:
                yield response.follow(conference_deets['details_link'], self.parse_conference_details, meta={'conference': conference_deets})


    def get_start_date(self, date_range):
        if date_range == 'N/A':
            return date_range
        start_date = re.search("(.*) - .*", date_range).group(1)
        return start_date
    
    def parse_conference_details(self, response):
        conference_deets = response.meta['conference']
        details_html = response.css('body > .contsec:nth-child(5) .cfp').get()
        details = re.search('<div class="cfp" align="left">((?:(.|[\n\r\t])*))', details_html).group(1)
        conference_deets['details'] = details
        yield conference_deets