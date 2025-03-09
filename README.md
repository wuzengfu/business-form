This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
1. Install relevant dependencies:
```bash
npm install 
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notes
1. The project requires environment variable `ONEMAP_TOKEN`, which is an API token to convert postal code to full address supported by [`onemap`](https://www.onemap.gov.sg/apidocs/search).
2. A valid postal code is required such that it can be converted to a valid address, latitude and longitude before proceed to the next page.
3. The project assumes that the backend API always returns a successful message, however, an error handler is also implemented.

## Example of the data being passed to backend via POST
```json
{
  "business": {
    "name": "Mr Cat Academy",
    "description": "this is a description of the business",
    "contact_email": "tution@example.com",
    "google_place_id": "12312312312312",
    "facebook_page_id": "12312312312312",
    "facebook_page_link": "https://facebook.com",
    "instagram_page_link": "https://google.com",
    "whatsapp_link": "https://whatsapp.com",
    "average_rating": "3.5"
  },
  "address": {
    "building_number": "Bishan Community Club",
    "street_name": "51 Bishan st 13",
    "unit_number": "#03-01",
    "postal_code": "579799",
    "full_address": "51 BISHAN STREET 13 BISHAN COMMUNITY CLUB SINGAPORE 579799",
    "latitude": "1.34947834623064",
    "longitude": "103.8507462049"
  },
  "businessHours": [
    {
      "day_name": "Monday",
      "open_time": "08:00:00",
      "close_time": "18:00:00"
    },
    {
      "day_name": "Tuesday",
      "open_time": "02:00:00",
      "close_time": "01:30:00"
    },
    {
      "day_name": "Wednesday",
      "open_time": "22:00:00",
      "close_time": "12:00:00"
    },
    {
      "day_name": "Thursday",
      "open_time": "22:30:00",
      "close_time": "00:30:00"
    },
    {
      "day_name": "Friday",
      "open_time": "01:30:00",
      "close_time": "01:30:00"
    },
    {
      "day_name": "Saturday",
      "open_time": "05:30:00",
      "close_time": "12:30:00"
    },
    {
      "day_name": "Sunday",
      "open_time": "02:00:00",
      "close_time": "22:30:00"
    }
  ],
  "services": [
    {
      "name": "Primary 1 Physicals Tuition",
      "tags": ["Primary 1", "Physicals", "G1", "Big Group", "Online"],
      "pricing": {
        "price": "40",
        "currency": "SGD",
        "pricing_unit": "hour",
        "variant_name": "Standard Rate"
      }
    },
    {
      "name": "Secondary 1 General Paper Tuition",
      "tags": ["Secondary 1", "General Paper", "NA (Normal Academic)", "1-to-1", "Hybrid"],
      "pricing": {
        "price": "50.5",
        "currency": "SGD",
        "pricing_unit": "hour",
        "variant_name": "Standard Rate"
      }
    }
  ]
}
```