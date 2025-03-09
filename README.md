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
2. A valid postal code is required such that it can be converted to a valid address before proceed to the next page.
3. The project assumes that the backend API always returns a successful message, however, an error handler is also implemented.