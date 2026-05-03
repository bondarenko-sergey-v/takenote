import React from 'react'

import { TestID } from '@resources/TestID'
import { ReactSubmitEvent } from '@/types'

export interface AddCategoryFormProps {
  dataTestID: string
  submitHandler: (event: ReactSubmitEvent, categoryName: string) => void
  changeHandler: (editingCategoryId: string, value: string) => void
  resetHandler: () => void
  editingCategoryId: string
  tempCategoryName: string
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  dataTestID,
  submitHandler,
  changeHandler,
  resetHandler,
  editingCategoryId,
  tempCategoryName,
}) => {
  return (
    <form
      data-testid={dataTestID}
      className="category-form"
      onSubmit={(event) => {
        event.preventDefault()
        event.currentTarget.querySelector('input')?.blur()
      }}
    >
      <input
        data-testid={TestID.NEW_CATEGORY_INPUT}
        aria-label="Category name"
        type="text"
        autoFocus
        maxLength={20}
        placeholder="New category..."
        value={tempCategoryName}
        onChange={(event) => {
          changeHandler(editingCategoryId, event.target.value)
        }}
        onBlur={(event) => {
          const { value } = event.currentTarget

          if (!value || value.trim() === '') {
            resetHandler()
          } else {
            submitHandler(event, value)
          }
        }}
      />
    </form>
  )
}
