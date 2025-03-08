export const getFullAddress = async (postalCode) => {
  const API_KEY = process.env.ONEMAP_TOKEN
  return await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`, {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
    },
  })
}