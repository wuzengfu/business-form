export const getFullAddress = async (postalCode) => {
  const API_KEY = process.env.ONEMAP_TOKEN
  return await fetch(
    `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
    {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    }
  )
}

export const submitBusinessForm = async (data, services) => {
  const businessData = {
    ...data,
    services: services.map((service) => {
      return {
        ...service,
        tags: [
          service.tags.level,
          service.tags.subject,
          service.tags.stream,
          service.tags.class_size,
          service.tags.delivery_mode,
        ],
      }
    }),
  }

  try {
    await Promise.resolve()
    return

    // Send to backend via POST
    const result = await fetch('http://www.xxxxxx.com', {
      method: 'POST',
      body: JSON.stringify(businessData),
    })
  } catch (e) {
    console.error(e)
  }
}
