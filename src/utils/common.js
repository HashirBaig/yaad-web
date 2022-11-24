const dimensions = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
}

const colorThemes = {
  primary: "fill-blue-600",
  danger: "fill-red-400",
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
