
export interface Permissions {
  createdAt: string;
  updatedAt: string;
  albumId: string;
  delete: boolean;
  userId: string;
  share: boolean;
  add: boolean;
  addBy?: string;
  _id: string;
  editPermissions: boolean;
}
export class IAlbum {
  public _id!: string;
  public title!: string;
  permissions?: Permissions;
  createdAt!: string;
  updatedAt!: string;
  createBy!: string;
}
export class IPhoto {
  _id!: string;
  user?: string;
  title!: string;
  thumbnailUrl?: string;
  createdAt!: string;
  updatedAt!: string;
}


