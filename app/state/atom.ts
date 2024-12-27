'use client'
import { atom } from "jotai";

export const authUser = atom({
  id: 0,
  name: "",
  email: "",
  email_verified_at: null,
  image: "",
  status: "",
  created_at: "",
  updated_at: "",
});
export const visibleWalkingAtom = atom(false);
export const productAtom = atom({ id: 12, name: "good stuff" });
