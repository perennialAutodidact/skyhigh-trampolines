import Counter from './components/Counter'
import logo from './logo.svg'
import './App.scss'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p className="bg-primary text-secondary">
          Edit <code className='text-info'>src/App.js</code> and save to reload.
        </p>
        <Counter />
      </header>
    </div>
  )
}

export default App
