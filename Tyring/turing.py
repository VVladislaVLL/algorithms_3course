R = +1
L = -1
N = 0  

CHANGE_TO  = 0
MOVE_TO    = 1 
NEXT_STATE = 2  

def turing_machine(program, tape, start_state, current_cell, alphabet):

  current_state = start_state

  while (True):
      rows = program[current_state]
      current_row = rows[alphabet.index(tape[current_cell])]
      tape[current_cell] = current_row[CHANGE_TO]
      if not current_row[MOVE_TO]: break
      current_cell += current_row[MOVE_TO] 
      current_state = current_row[NEXT_STATE]
  return tape


first_program = {
    'q0': (('a', R, 'q1'), ('b', R, 'q1'), ('c', R, 'q1'), ('_', N, '!')),
    'q1': (('a', R, 'q0'), ('a', R, 'q0'), ('a', R, 'q0'), ('_', N, '!')),
}
alphabet_first = ['a', 'b', 'c', '_']
alphabet_second = ['a', 'b', '_']

second_program = {
    'q0': (('b', R, 'q0'), ('a', R, 'q0'), ('_', N, '!')),
}

output1 = turing_machine(
    first_program,
    list('bbbbbbccccbcbcbcbcbb_'), 
    "q0", 
    0, alphabet_first)

output2 = turing_machine(
    second_program,
    list('abbba_'), 
    "q0", 
    0, alphabet_second)


print(output1)
print(output2)
