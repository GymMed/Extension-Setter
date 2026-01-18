export interface DirectoryItem {
  name: string
}

export interface DirectoryResponse {
  message: string
  path: string
  directories: DirectoryItem[]
}
