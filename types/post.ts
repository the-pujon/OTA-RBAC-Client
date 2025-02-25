export interface IPost {
  _id: string // Added for document reference
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

