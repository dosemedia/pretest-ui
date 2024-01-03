import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/dom'
import LoginForm from '../components/auth/LoginForm'
import { authStore } from '../stores/stores'

import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegisterForm from '../components/auth/RegisterForm';
import { DateTime } from 'luxon';
import { act } from 'react-dom/test-utils';

const queryClient = new QueryClient()
const userEmail = `test_user_${DateTime.now().toMillis()}@user.com`

describe("User register authentication", () => {
  it("User cannot register without email present", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    act(() => {
      result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    })
    const emailInput = result.container.querySelector('#email')
    act(() => {
      fireEvent.change(emailInput!, { target: { value: userEmail } })
    })
    const signUpButton = result.container.querySelector('#signup_button')
    expect(signUpButton).toBeDisabled()
  })
  it("User cannot register without password present", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    act(() => {
      result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    })
    const passwordInput = result.container.querySelector('#password')
    act(() => {
      fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    })
    const signupButton = result.container.querySelector('#signup_button')
    expect(signupButton).toBeDisabled()

  })
  it("User cannot register without correct email and password and legal acceptance checked", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    act(() => {
      result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    })
    const passwordInput = result.container.querySelector('#password')
    const emailInput = result.container.querySelector('#email')
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')
    act(() => {
      fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
      fireEvent.change(emailInput!, { target: { value: userEmail } })
    })
    expect(legalCheckboxInput).not.toBeChecked()
  })
  it.only("User can register", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    act(() => {
      result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    })
    const passwordInput = result.container.querySelector('#password')!
    const emailInput = result.container.querySelector('#email')!
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')!
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'foobar' } })
      fireEvent.change(emailInput, { target: { value: userEmail } })
      fireEvent.click(legalCheckboxInput)
    })

    const registerButton = result.container.querySelector('#signup_button')!
    act(() => {
      fireEvent.click(registerButton)
    })
    // await new Promise(resolve => setTimeout(resolve, 2000));
    await waitFor(async () => {
      const errorMessage = result.container.querySelector('#error_message')
      expect(errorMessage).not.toBeInTheDocument()
      act(() => {
        authStore.token = ''
      })
    })
  })
  it.only("User cannot use taken email", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    act(() => {
      result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    })
    const passwordInput = result.container.querySelector('#password')!
    const emailInput = result.container.querySelector('#email')!
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')!
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'foobar' } })
      fireEvent.change(emailInput, { target: { value: userEmail } })
      fireEvent.click(legalCheckboxInput)
    })
    const loginButton = result.container.querySelector('#signup_button')!
    act(() => {
      fireEvent.click(loginButton)
    })
    await waitFor(() => {
      const errorMessage = screen.getByText(/already exists/)
      expect(errorMessage).toBeVisible()
    })
  })
})

describe("User login authentication", async () => {
  authStore.token = ''
  it("User cannot login with a password present", async () => {
    const result = render(<QueryClientProvider client={queryClient}><Router><LoginForm /></Router></QueryClientProvider>)
    const emailInput = result.container.querySelector('#email')
    fireEvent.change(emailInput!, { target: { value: userEmail } })
    const loginButton = result.container.querySelector('#login_button')
    fireEvent.click(loginButton!)
    await waitFor(() => {
      const errorMessage = screen.getByText(/did not match/)
      expect(errorMessage).toBeVisible()
    })
  })
  it("User cannot login with an email present", async () => {
    const result = render(<QueryClientProvider client={queryClient}><Router><LoginForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    const loginButton = result.container.querySelector('#login_button')
    fireEvent.click(loginButton!)
    await waitFor(() => {
      const errorMessage = screen.getByText(/Email is required/)
      expect(errorMessage).toBeVisible()
    })
  })
  it("User cannot login without correct email and password", async () => {
    const result = render(<QueryClientProvider client={queryClient}><Router><LoginForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    const emailInput = result.container.querySelector('#email')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    fireEvent.change(emailInput!, { target: { value: DateTime.now().toString() + '@user.com' } })
    const loginButton = result.container.querySelector('#login_button')
    fireEvent.click(loginButton!)
    await waitFor(() => {
      const errorMessage = screen.getByText(/User not found/)
      expect(errorMessage).toBeVisible()
    })
  })
  it("User can login with correct email and password", async () => {
    const result = render(<QueryClientProvider client={queryClient}><Router><LoginForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    const emailInput = result.container.querySelector('#email')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    fireEvent.change(emailInput!, { target: { value: userEmail } })
    const loginButton = result.container.querySelector('#login_button')
    fireEvent.click(loginButton!)
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitFor(() => {
      const errorMessage = result.container.querySelector('#error_message')
      expect(errorMessage).not.toBeInTheDocument()
      authStore.token = ''
    })
  })
})