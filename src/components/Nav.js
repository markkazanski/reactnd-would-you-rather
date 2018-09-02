import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Unanswered Questions
          </NavLink>
        </li>
        <li>
          <NavLink to='/answered' activeClassName='active'>
            Answered Questions
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            Submit New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li>
          <NavLink to='/logout' activeClassName='active'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
} 