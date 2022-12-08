const dimensions = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
}

const colorThemes = {
  primary: "fill-blue-600",
  danger: "fill-red-400",
  success: "fill-green-400",
  light: "fill-white",
}

export const getSpinnerSize = size => {
  if (!size) {
    return dimensions["sm"]
  }
  return dimensions[size]
}

export const getSpinnerColor = color => {
  if (!color) {
    return colorThemes["primary"]
  }
  return colorThemes[color]
}

export const getSortedData = res => {
  if (!res) return []

  const rawDocs = res?.docs?.map(doc => ({ ...doc?.data(), id: doc?.id }))
  const data = rawDocs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return data
}
