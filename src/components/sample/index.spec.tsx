import React from 'react'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Sample from '.'

const test = { test: 'tost' }

enzyme.configure({ adapter: new Adapter() })

it('shallow renders without crashing', () => {
  enzyme.shallow(<Sample />)
})
