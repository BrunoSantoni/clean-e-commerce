import { Cpf } from '../src/Cpf'

it('should validate a valid cpf', function () {
	const cpf = new Cpf('935.411.347-80')
	expect(cpf.value).toBe('935.411.347-80')
})

const wrongSameDigitCpf = [
	'111.111.111-11',
	'222.222.222-22',
	'333.333.333-33'
]

it.each(wrongSameDigitCpf)('should invalidate cpfs that are the same digit', function (cpf) {
	expect(() => new Cpf(cpf)).toThrow(new Error('Invalid document'))
})