export default function ({ store, route, redirect }) {
  if (route.path === '/login') {
    return;
  }
  if (!store.state.authModule.user) {
    return redirect('/login')
  }
}
