export class Permissions {
  edit: boolean = false;
  delete: boolean = false;
}
export class IAlbum {
  public id!: string;
  public title!: string;
  permissions: Permissions = new Permissions();
}
export class Photo {
  id!: string;
  user?: string;
  title!: string;
  thumbnailUrl?: string;
}


