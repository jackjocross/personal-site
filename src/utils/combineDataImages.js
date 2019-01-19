export function combineDataImages(data, images) {
  const imageMap = images.reduce(
    (
      acc,
      {
        node: {
          childImageSharp: { fixed },
        },
      }
    ) => ({ ...acc, [fixed.originalName]: fixed }),
    {}
  )

  return data.map(data => ({ ...data, fixed: imageMap[data.imagePath] }))
}
