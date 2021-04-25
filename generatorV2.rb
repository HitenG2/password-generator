class Generator
	attr_accessor :passLengthSelected, :upCase, :numbers

	def initialize(passLengthSelected, upCase, numbers)
		@passLengthSelected = passLengthSelected
		@upCase = upCase
		@numbers = numbers
	end

	def password
		alphabetEnVowels = "uoiea"
		alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb"
		combinations = ["ch", "zc", "sh", "th", "ph", "dg"]
		pass = ""
		check = false
		while (pass.length != passLengthSelected.to_i)
			if check == true
				pass += alphabetEnVowels[rand(alphabetEnVowels.length)]
				check = false
			else
				choise = rand(2)
				if choise == 1 && pass.length + 1 != passLengthSelected
					pass += alphabetEnCons[rand(alphabetEnCons.length)]
				elsif choise == 0 && !(pass.length + 1 >= passLengthSelected.to_i)
					pass += combinations[rand(combinations.length)]
				end
				check = true
			end
		end
		if upCase == true 
			pass[0] = pass[0].upcase
		end
		if numbers == true
			for i in pass.length - 3..pass.length
				pass[i] = rand(10).to_s
			end
		end
		return pass
	end
end

def checkUses
	check = true
	while check != true || check != false
		temp = gets.chomp.upcase
		if temp == 'Y' 
			check = true
			break
		elsif temp == 'N' 
			check = false
			break
		else 
			puts "Wrong args, available only 'Y' or 'N'"
			redo
		end
	end
	return check
end

print "Enter a pass length: "
passLengthSelected = gets
puts "Use upcase? Y/N"
upCase = checkUses
puts "Use numbers?"
numbers = checkUses
puts "Selected options:
upcase is #{upCase}
numbers is #{numbers}"
generate = Generator.new(passLengthSelected, upCase, numbers)
puts generate.password
