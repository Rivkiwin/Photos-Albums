export class IAlbum {
  public id!: string;
 public   title!: string;
}

export class Photo {
    id!: string;
    user?: string;
    title!: string;
    thumbnailUrl?: string;
}
