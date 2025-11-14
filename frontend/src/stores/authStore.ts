import create from 'zustand';

type State = { token:string | null, user:any | null, setToken:(t:string|null)=>void };
export const useAuthStore = create<State>((set)=>({ token: null, user: null, setToken: (t)=> set({token:t, user: t? { } : null}) }));

export const getToken = () => {
  try{ return localStorage.getItem('token'); }catch(e){return null}
}
export const setTokenLocal = (t:string|null)=>{
  if(t) localStorage.setItem('token',t); else localStorage.removeItem('token');
}
