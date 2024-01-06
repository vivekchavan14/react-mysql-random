
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LatestPosts from './components/LatestPosts/LatestPosts.jsx'
import NewPostForm from './components/NewPostForm/NewPostForm.jsx'
import Post from './components/Post.jsx'
import ViewPositive from './components/ViewPositive.jsx/ViewPositive.jsx'
import PositiveComments from './components/PositiveComment/PositiveComments.jsx'
import FrontPage from './components/FrontPage.jsx'

function App() {
 

  return (
    <div className='App'>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<LatestPosts/>} />
            <Route path='/newpost' element={<NewPostForm/>} />
            <Route path='/posts' element={<Post />} />
            <Route path='/positivecmt' element={<PositiveComments/>} />
  
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
