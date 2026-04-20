import { createContext, useContext, useState, useMemo } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const clearFilters = () => {
    setSearchQuery('')
    setActiveSection('all')
    setSeverityFilter('all')
  }

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    activeSection,
    setActiveSection,
    severityFilter,
    setSeverityFilter,
    clearFilters,
    hasActiveFilters: searchQuery || activeSection !== 'all' || severityFilter !== 'all'
  }), [searchQuery, activeSection, severityFilter])

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
