// category.spec.ts
// Tests for manipulating note categories

import {
  addCategory,
  assertCategoryDoesNotExist,
  assertCategoryExists,
  assertCategoryOptionsOpened,
  assertCategoryOrder,
  navigateToCategory,
  selectMoveToCategoryOption,
  startEditingCategory,
  renameCategory,
  renameCategoryWithEnter,
  defocusCategory,
  moveCategory,
  openCategoryContextMenu,
  clickCategoryOptionRename,
  clickCategoryOptionDelete,
  collapseCategoryList,
  assertCategoryListExists,
  assertCategoryListDoesNotExists,
} from '../utils/testCategoryHelperUtils'
import { dynamicTimeCategoryName } from '../utils/testHelperEnums'
import {
  defaultInit,
  navigateToNotes,
  assertCurrentFolderOrCategory,
} from '../utils/testHelperUtils'
import {
  assertNoteListLengthEquals,
  clickNoteOptions,
  createXUniqueNotes,
} from '../utils/testNotesHelperUtils'

describe('Categories', () => {
  defaultInit()

  it('should hide the category list on click of category', () => {
    addCategory(dynamicTimeCategoryName)

    collapseCategoryList()

    assertCategoryListDoesNotExists()
  })

  it('should show category list on add new category', () => {
    collapseCategoryList()

    addCategory(dynamicTimeCategoryName)

    assertCategoryListExists()
  })

  it('creates a new category with the current time', () => {
    addCategory(dynamicTimeCategoryName)
  })

  it('should submit a new category when pressing Enter', () => {
    addCategory('Enter category')

    assertCategoryExists('Enter category')
  })

  it('should normalize a new category name on submit', () => {
    addCategory('scientific books', 'Scientific books')

    assertCategoryExists('Scientific books')
  })

  it('should prevent duplicate categories after normalization', () => {
    addCategory('scientific books', 'Scientific books')
    addCategory('Scientific books')

    cy.findAllByText('Scientific books').should('have.length', 1)
  })

  it('should add a note to new category', () => {
    // add a category
    addCategory(dynamicTimeCategoryName)

    // navigate back to All Notes create a new note, and move it to that category
    navigateToNotes()
    createXUniqueNotes(1)
    clickNoteOptions()
    selectMoveToCategoryOption(dynamicTimeCategoryName)

    // make sure it ended up in the category
    navigateToCategory(dynamicTimeCategoryName)
    assertNoteListLengthEquals(1)
  })

  it('should rename existing category after defocusing edit state', () => {
    const originalCategoryName = 'Category'
    const newCategoryName = 'Renamed Category'

    addCategory(originalCategoryName)
    startEditingCategory(originalCategoryName)
    renameCategory(originalCategoryName, newCategoryName)
    defocusCategory(newCategoryName)

    assertCategoryExists(newCategoryName)
  })

  it('should normalize a renamed category name on submit', () => {
    const originalCategoryName = 'Category'
    const newCategoryName = 'scientific books'

    addCategory(originalCategoryName)
    startEditingCategory(originalCategoryName)
    renameCategoryWithEnter(newCategoryName)

    assertCategoryExists('Scientific books')
  })

  it('should change category order', () => {
    const firstCategory = 'Source Category'
    const secondCategory = 'Destination Category'

    addCategory(firstCategory)
    addCategory(secondCategory)
    moveCategory(firstCategory, secondCategory)
    assertCategoryOrder(firstCategory, 3)
    moveCategory(secondCategory, firstCategory)
    assertCategoryOrder(secondCategory, 3)
  })

  it('should open context menu with right click', () => {
    const categoryName = 'Context Menu'

    addCategory(categoryName)
    openCategoryContextMenu(categoryName)
    assertCategoryOptionsOpened()
  })

  it('should allow category rename through context menu', () => {
    const originalCategoryName = 'Category CM'
    const newCategoryName = 'Renamed Category CM'

    addCategory(originalCategoryName)
    openCategoryContextMenu(originalCategoryName)
    clickCategoryOptionRename()
    renameCategory(originalCategoryName, newCategoryName)
    defocusCategory(newCategoryName)

    assertCategoryExists(newCategoryName)
  })

  it('should allow category permanent delete through context menu', () => {
    addCategory(dynamicTimeCategoryName)

    openCategoryContextMenu(dynamicTimeCategoryName)
    clickCategoryOptionDelete()

    assertCategoryDoesNotExist(dynamicTimeCategoryName)
  })

  it('should redirect to notes after deleting the category you are in', () => {
    addCategory(dynamicTimeCategoryName)

    navigateToCategory(dynamicTimeCategoryName)
    openCategoryContextMenu(dynamicTimeCategoryName)
    clickCategoryOptionDelete()

    assertCurrentFolderOrCategory('Notes')
  })
})
