class PrimeMath {
    static getPrimeFactors(number, returnExponentialForm = false) {
        const primeFactors = [];

        while (number % 2 === 0) {
            primeFactors.push(2);
            number /= 2;
        }

        for (let i = 3; i <= Math.sqrt(number); i += 2) {
            while (number % i === 0) {
                primeFactors.push(i);
                number /= i;
            }
        }

        if (number > 2) {
            primeFactors.push(number);
        }

        if (returnExponentialForm) {
            return primeFactors.reduce((exponentialForm, prime) => {
                const baseIndex = exponentialForm.findIndex(ef => ef.base === prime);

                if (baseIndex === -1) {
                    exponentialForm.push({ base: prime, power: 1 });
                } else {
                    exponentialForm[baseIndex].power += 1;
                }

                return exponentialForm;
            }, []);
        }

        return primeFactors;
    }
}

module.exports = PrimeMath;
