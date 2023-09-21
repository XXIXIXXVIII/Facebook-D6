import { RepositoryFactory } from '../apiConfig/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')

export default async function  ({ params,redirect }) {
  const userId = params.id
  const result = await userRepository.getUserDetail({id: userId})

  if (result.data.message === 'Not found') {
    return redirect('/Notfound')
  }
}
