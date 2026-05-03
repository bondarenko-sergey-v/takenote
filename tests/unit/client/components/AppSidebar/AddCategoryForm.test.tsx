import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { AddCategoryForm, AddCategoryFormProps } from '@/components/AppSidebar/AddCategoryForm'

describe('<AddCategoryForm />', () => {
  const buildProps = (overrides: Partial<AddCategoryFormProps> = {}): AddCategoryFormProps => ({
    submitHandler: jest.fn(),
    changeHandler: jest.fn(),
    resetHandler: jest.fn(),
    editingCategoryId: 'Category-id',
    tempCategoryName: 'Category',
    dataTestID: TestID.NEW_CATEGORY_FORM,
    ...overrides,
  })

  it('renders the AddCategoryForm component', () => {
    const enabledProps = buildProps()

    const component = render(<AddCategoryForm {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the current temporary category name', () => {
    const { getByTestId } = render(<AddCategoryForm {...buildProps()} />)

    expect(getByTestId(TestID.NEW_CATEGORY_INPUT)).toHaveValue('Category')
  })

  it('submits the blurred input value when it is not blank', () => {
    const submitHandler = jest.fn()
    const { getByTestId } = render(<AddCategoryForm {...buildProps({ submitHandler })} />)

    fireEvent.blur(getByTestId(TestID.NEW_CATEGORY_INPUT), {
      target: { value: 'scientific books' },
      currentTarget: { value: 'scientific books' },
    })

    expect(submitHandler).toHaveBeenCalledTimes(1)
    expect(submitHandler.mock.calls[0][1]).toBe('scientific books')
  })

  it('resets instead of submitting a blank blurred input value', () => {
    const submitHandler = jest.fn()
    const resetHandler = jest.fn()
    const { getByTestId } = render(
      <AddCategoryForm
        {...buildProps({
          submitHandler,
          resetHandler,
          tempCategoryName: '',
        })}
      />
    )

    fireEvent.blur(getByTestId(TestID.NEW_CATEGORY_INPUT), {
      target: { value: '   ' },
      currentTarget: { value: '   ' },
    })

    expect(resetHandler).toHaveBeenCalledTimes(1)
    expect(submitHandler).not.toHaveBeenCalled()
  })
})
