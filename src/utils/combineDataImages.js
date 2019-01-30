export function combineDataImages(data, images) {
  const imageMap = images.reduce(
    (
      acc,
      {
        node: {
          childImageSharp: { fixed, fluid },
        },
      }
    ) => ({
      ...acc,
      [fixed ? fixed.originalName : fluid.originalName]: { fixed, fluid },
    }),
    {}
  )

  return data.map(data => ({ ...data, ...imageMap[data.imagePath] }))
}
