import { fireEvent, render, waitFor, screen } from '@testing-library/react'

import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegisterForm from '../components/auth/RegisterForm';
import { DateTime } from 'luxon';
import * as router from 'react-router'
import { authStore } from '../stores/stores';
import LoginForm from '../components/auth/LoginForm';

const queryClient = new QueryClient()
const userEmail = `test_user_${DateTime.now().toMillis()}@user.com`
const navigate = vi.fn()
beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})
describe("User register authentication", () => {
  it("User cannot register without email present", async () => {
    const result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    const emailInput = result.container.querySelector('#email')
    fireEvent.change(emailInput!, { target: { value: userEmail } })
    const signUpButton = result.container.querySelector('#signup_button')
    expect(signUpButton).toBeDisabled()
  })
  it("User cannot register without password present", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    const signupButton = result.container.querySelector('#signup_button')
    expect(signupButton).toBeDisabled()

  })
  it("User cannot register without correct email and password and legal acceptance checked", async () => {
    let result: ReturnType<typeof render> = render(<div></div>)
    result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    const emailInput = result.container.querySelector('#email')
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    fireEvent.change(emailInput!, { target: { value: userEmail } })
    expect(legalCheckboxInput).not.toBeChecked()
  })
  it("User can register", async () => {
    vi.spyOn(authStore, 'register').mockImplementation(async () => {
      await Promise.resolve()
    });
    const result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')!
    const emailInput = result.container.querySelector('#email')!
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')!
    fireEvent.change(passwordInput, { target: { value: 'foobar' } })
    fireEvent.change(emailInput, { target: { value: userEmail } })
    fireEvent.click(legalCheckboxInput)
    const loginButton = result.container.querySelector('#signup_button')!
    fireEvent.click(loginButton)
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith('/');
    })
  })
  it("User cannot use taken email", async () => {
    vi.spyOn(authStore, 'register').mockImplementation(async () => {
      throw new Error('account already exists')
    });
    const result = render(<QueryClientProvider client={queryClient}><Router><RegisterForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')!
    const emailInput = result.container.querySelector('#email')!
    const legalCheckboxInput = result.container.querySelector('#legal_checkbox')!
    fireEvent.change(passwordInput, { target: { value: 'foobar' } })
    fireEvent.change(emailInput, { target: { value: userEmail } })
    fireEvent.click(legalCheckboxInput)
    const loginButton = result.container.querySelector('#signup_button')!
    fireEvent.click(loginButton)
    await waitFor(() => {
      const errorMessage = screen.getByText(/already exists/)
      expect(errorMessage).toBeVisible()
    })
  })
})


describe("User login authentication", async () => {
  it("User cannot login without a password present", async () => {
    vi.spyOn(authStore, 'login').mockImplementation(async () => {
      throw new Error('Email or password did not match')
    });
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
  it("User cannot login without an email present", async () => {
    vi.spyOn(authStore, 'login').mockImplementation(async () => {
      throw new Error('Email is required')
    });
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
    vi.spyOn(authStore, 'login').mockImplementation(async () => {
      throw new Error('User not found')
    });
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
    vi.spyOn(authStore, 'login').mockImplementation(async () => {
      await Promise.resolve()
    });
    const result = render(<QueryClientProvider client={queryClient}><Router><LoginForm /></Router></QueryClientProvider>)
    const passwordInput = result.container.querySelector('#password')
    const emailInput = result.container.querySelector('#email')
    fireEvent.change(passwordInput!, { target: { value: 'foobar' } })
    fireEvent.change(emailInput!, { target: { value: userEmail } })
    const loginButton = result.container.querySelector('#login_button')
    fireEvent.click(loginButton!)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    })
  })
})
