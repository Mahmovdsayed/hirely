import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserPlan = "free" | "basic" | "pro" | null;
type UserRoles = "freelancer" | "client" | "company" | null;

export interface UserStateTypes {
  id: string | null;
  email: string | null;
  userName: string | null;
  avatar: string | null;
  role: UserRoles;
  plan: UserPlan;
}

const initialState: UserStateTypes = {
  id: null,
  email: null,
  plan: null,
  role: null,
  userName: null,
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserStateTypes>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.plan = action.payload.plan;
      state.role = action.payload.role;
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
    },
    updateUser(state, action: PayloadAction<Partial<UserStateTypes>>) {
      Object.assign(state, action.payload);
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
