export interface MenuItem {
  title: string;
  url: string;
  id: number;
  order: number;
  parent: number | null;
  classes: string[];
  current: boolean;
}

export interface MenuSection {
  items: MenuItem[];
}

export interface Menu {
  primary: MenuSection;
}