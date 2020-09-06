import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /second/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /third/i })).toBeInTheDocument()
})
