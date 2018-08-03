#Create a REST API and the details are as follows:

#REST API for tweets:
 - POST: /tweets - Add new tweet
 - GET: /tweets - Get all tweets including count and pagination
 - GET: /tweets/:uid - Get a single tweet
 - PUT: /tweets/:uid - Update tweet using uid
 - DELETE: /tweets/:uid - Delete tweet using uid

#Schema for Tweets:
 - uid > string
 - content > string
 - created_at > date
 - updated_at > date

#Technology: Node.js - Express framework 
#Database - MySQL
#Test: Mocha