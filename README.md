7
# GNews Scraping API

## Overview

The GNews Scraping API is a Node.js server-side application designed to scrape news articles from Google News. It utilizes the Axios library for making HTTP requests, Cheerio for web scraping, and Express for creating a RESTful API. The API provides endpoints for searching news based on a query term and retrieving news from specific topics such as health, sports, entertainment, business, science, technology, world, and India.

## Usage

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vaxad/news-api.git
   ```

2. Install dependencies:

   ```bash
   cd news-api-main
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   The server will run at `http://localhost:4000/`.

### Endpoints

#### 1. Health Check

- Endpoint: `/`
- Method: `GET`
- Description: Check if the server is live.

#### 2. Search News

- Endpoint: `/gnews/search/:term`
- Method: `GET`
- Description: Get news articles based on the specified search term.

   Example: `/gnews/search/technology`

#### 3. Get News by Topic

- Endpoint: `/gnews/topic/:term`
- Method: `GET`
- Description: Get news articles from specific topics (health, sports, entertainment, business, science, technology, world, India).

   Example: `/gnews/topic/health`

## Deployment

The API is deployed on [gNewsApi](https://gnews-api.onrender.com/). You can use this deployed instance to fetch news data in your applications.

## Frontend

A sample frontend application using this API is available at [NewsDekho](https://news-dekho-vaxad.vercel.app/).

## Technologies Used

- Node.js
- Express.js
- Axios
- Cheerio

## Acknowledgments

- Thanks to the contributors of Axios, Cheerio, and Express for creating and maintaining these amazing libraries.
- Special thanks to Google News for providing a platform to access news content.
