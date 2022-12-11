export type paramsSingup = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  etablissement: string;
  cap: string;
  formateur: string;
  classe: string;
};

export type error = {
  error: string;
};

export type item = {
  key: number;
  label: string;
  name: string;
  type: any;
  value: any;
  valid: boolean;
  errorMsg: string;
  // setValue: any;
};

export type LYS_ItemList = {
  key: number;
  label: string;
  image: string;
  desc: string;
  href?: string;
  link?: string;
};

export type navBarProps = {
  currentPage: string;
  activeOnPage: Array<navBarItem>;
};

export type navBarItem = {
  logo: string;
  selectedLogo: string;
  key: number;
  redirection: string;
};

export type navBarTab = {
  tab: string;
  name: string;
};

export type header = {
  tab: string;
  label: string;
};

export type comment = {
  username: string;
  usernameIcon: string;
  comment: string;
  like: number;
  comments: comment[];
};

export type profile = {
  profilHeader: profileHeader;
  profilSub: profileSub;
  profileContent: profileContent;
};

export type profileSub = {
  subscribers: number;
  subscribeds: number;
};

export type profileHeader = {
  username: string;
  usernameIcon: string;
  formation: string;
  city: string;
  description: string;
};

export type profileContent = {
  cards: card[];
  infos: info[];
  cv: cv;
};

export type card = {
  username?: string;
  title?: string;
  usernameIcon?: string;
  image?: string[];
  description?: string;
  like?: number;
  share?: number;
  comments?: number;
};

export type info = {
  key: number;
  label: string;
  isChecked?: boolean;
  subInfos: subInfo[];
};

export type subInfo = {
  key: number;
  label: string;
  desc: string;
};

export type cv = {
  key: number;
  label: string;
  cvLink: string;
};

export type cardWork = {
  idCard: number;
  username: string;
  title: string;
  usernameIcon: string;
  job: string;
  area: string;
  contract: string;
  favorite: boolean;
};
