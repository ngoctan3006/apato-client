import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ApartModel {
  id: number,
  image: string,
  title: string,
  address: string,
  rating: number,
  price: string,
  total_rating: number,
  user_id: number,
  detail: string
}

function genFakeApartList() {
  let Data: ApartModel[] = []
  for (let i = 1; i < 100; i++) {
    Data.push({
      id: i + 100,
      image: "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg",
      title: "Apartment" + " " + i.toString(),
      address: "DongDa, Hanoi, Viet Nam",
      rating: Math.ceil(Math.random() * 5),
      total_rating: 0,
      price: "1.000.000",
      user_id: i,
      detail: "Nha chung cu"
    })
  }
  return Data
}

export const FAKE_DATA: ApartModel[] = genFakeApartList()

export interface PostState {
  posts: ApartModel[],
}

const initialState = {
  posts: FAKE_DATA
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    _pushFakePost(state, action: PayloadAction<ApartModel>) {
      const newPost = action.payload
      state.posts.unshift(newPost)
    },
    _loadAll(state) {
      return state
    }
  },
})

export const {_pushFakePost, _loadAll} = postSlice.actions
export default postSlice.reducer
