export enum ImageVariant {
    detail = "detail",
    full = "",
    portrait_small = "portrait_small",
    portrait_medium = "portrait_medium",
    portrait_xlarge = "portrait_xlarge",
    portrait_fantastic = "portrait_fantastic",
    portrait_uncanny = "portrait_uncanny",
    portrait_incredible = "portrait_incredible",
    standard_small = "standard_small",
    standard_medium = "standard_medium",
    standard_large = "standard_large",
    standard_xlarge = "standard_xlarge",
    standard_fantastic = "standard_fantastic",
    standard_amazing = "standard_amazing",
    landscape_small = "landscape_small",
    landscape_medium = "landscape_medium",
    landscape_large = "landscape_large",
    landscape_xlarge = "landscape_xlarge",
    landscape_amazing = "landscape_amazing",
    landscape_incredible = "landscape_incredible"
}

export interface ImageThumbnail {
    path: string;
    extension: string
}
