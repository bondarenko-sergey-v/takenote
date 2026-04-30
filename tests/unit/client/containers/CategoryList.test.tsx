import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TestID } from '@resources/TestID'
import { CategoryList } from '@/containers/CategoryList'
import { addCategory } from '@/slices/category'
import { useDispatch, useSelector } from 'react-redux'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }: { children: (provided: any) => React.ReactElement }) =>
    children({
      droppableProps: {},
      innerRef: jest.fn(),
      placeholder: null,
    }),
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'category-id'),
}))

jest.mock('@/containers/CategoryOption', () => ({
  CategoryOption: () => <div />,
}))

jest.mock('@/contexts/TempStateContext', () => ({
  useTempState: () => ({
    addingTempCategory: true,
    setAddingTempCategory: jest.fn(),
  }),
}))

const mockedUseDispatch = useDispatch as jest.Mock
const mockedUseSelector = useSelector as jest.Mock

describe('<CategoryList />', () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(jest.fn())
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        categoryState: {
          categories: [],
          editingCategory: {
            id: '',
            tempName: 'scientific books',
          },
          error: '',
          loading: false,
        },
      })
    )
  })

  it('normalizes a new category name before submitting it', () => {
    const dispatch = jest.fn()
    mockedUseDispatch.mockReturnValue(dispatch)

    const component = render(<CategoryList />)

    fireEvent.submit(component.getByTestId(TestID.NEW_CATEGORY_FORM))

    expect(dispatch).toHaveBeenCalledWith(
      addCategory({
        id: 'category-id',
        name: 'Scientific books',
        draggedOver: false,
      })
    )
  })
})
