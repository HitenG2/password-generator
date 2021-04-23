class Generator
	attr_accessor :passLengthSelected

	def initialize(passLengthSelected)
		@passLengthSelected = passLengthSelected
	end

	def password
		alphabetEnVowels = "uoiea"
		alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb"
		pass = ""
		check = false
		while (pass.length != passLengthSelected.to_i)
			if check == true
				pass += alphabetEnVowels[rand(alphabetEnVowels.length)]
				check = false
			else
				pass += alphabetEnCons[rand(alphabetEnCons.length)]
				check = true
			end
		end
		return pass
	end
end

print "Введите длину пароля: "
passLengthSelected = gets
generate = Generator.new(passLengthSelected)
puts generate.password