export const getFullAddress = async (postalCode) => {
  const API_KEY = process.env.ONEMAP_TOKEN
  return await fetch(
    `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
    {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    },
  )
}

export const submitBusinessForm = async (data) => {
  const services = {
    ...data,
    services: data.services.map(service => {
      return {
        ...service,
        tags: [service.tag.level, service.tag.subject, service.tag.stream, service.tag.class_size, service.tag.delivery_mode],
      }
    }),
  }

  try {
    console.log(services)
    await Promise.resolve()
    return

    // Send to backend via POST
    const result = await fetch('http://www.xxxxxx.com', {
      method: 'POST',
      body: JSON.stringify(services),
    })
  } catch (e) {
    console.error(e)
  }
}
