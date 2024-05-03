import '@styles/globals.css'

import Nav from '@components/Nav'
import { Providers } from '@Provider'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Prompt App',
  description: 'share promt and find new prompts',
}

function Rootlayout({children}) {
  return (
    <html lang="en">
        <body>
          <Provider>
            <div className='main' >
            <div className='gradient'/>
            </div>
            <main className="app">
              <Providers>
                <Nav/>
                {children}
                </Providers>
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout