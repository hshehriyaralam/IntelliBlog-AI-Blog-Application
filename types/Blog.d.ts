export interface BlogFormDataTypes {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  image: File | null;
  imagePreview: string;
  userId : string
}


export  interface LoaderProps {
  text?: string;
  color?: string;
}

export type DraftFilters = {
  authorId: string;
  title: string;
  date: string; 
  tag: string;
};


 export interface User {
  id: string; 
  name: string;
  profilePic: string;
}



export type PaginationItemsProps = {
  ItemsPerPage: number;
  filteredItems: any[];
  onPageChange: (items: any[]) => void;
  themeValue?: boolean;
};