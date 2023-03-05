/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.get('/', 'InteractionsController.get')
  Route.get('/:id', 'InteractionsController.getById')
  Route.post('/', 'InteractionsController.create')
  Route.put('/', 'InteractionsController.update')
  Route.delete('/:id', 'InteractionsController.destroy')
}).prefix('interaction')

Route.group(()=>{
  Route.get('/', 'AnswersController.get')
  Route.get('/:id', 'AnswersController.getById')
  Route.post('/', 'AnswersController.create')
  Route.put('/', 'AnswersController.update')
  Route.delete('/:id', 'AnswersController.destroy')
}).prefix('answer')

Route.group(()=>{
  Route.get('/', 'BlockListsController.get')
  Route.get('/:id', 'BlockListsController.getById')
  Route.post('/', 'BlockListsController.create')
  Route.put('/', 'BlockListsController.update')
  Route.delete('/:id', 'BlockListsController.destroy')
}).prefix('blockList')
