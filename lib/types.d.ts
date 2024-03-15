export type CardSocials = {
  id: string;
  socialTitle: string;
  username: string;
  profileUrl: string;
}[];

export type CardIcons = {
  id: string;
  title: string;
}[];

export type ProfilePicturePreview = {
  name: string;
  mime: string;
  url: string;
};

export type ImgbbImageRes = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
};

export type ImgbbFormData = {
  imgbbId: string;
  title: string;
  url: string;
  imgbbUrl: string;
  deleteUrl: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  time: number;
};
