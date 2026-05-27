export function filterFamilies(list, filters) {
  return list.filter((p) => {
    if (filters.country && p.country !== filters.country) return false;
    if (filters.language && !p.languages.some((l) => l.toLowerCase().includes(filters.language.toLowerCase()))) return false;
    if (filters.ageSought && !p.ageSought.includes(filters.ageSought.split('-')[0]?.trim())) {
      const min = parseInt(filters.ageSought, 10);
      if (!Number.isNaN(min) && !p.ageSought.includes(String(min))) return false;
    }
    if (filters.childrenCount) {
      const n = parseInt(filters.childrenCount, 10);
      if (n === 1 && p.childrenCount !== 1) return false;
      if (n === 2 && p.childrenCount !== 2) return false;
      if (n === 3 && p.childrenCount < 3) return false;
    }
    if (filters.stayDuration && !p.stayDuration.toLowerCase().includes(filters.stayDuration.toLowerCase())) return false;
    if (filters.drivingLicense === 'yes' && !p.drivingLicense) return false;
    if (filters.drivingLicense === 'no' && p.drivingLicense) return false;
    return true;
  });
}

export function filterAuPairs(list, filters) {
  return list.filter((p) => {
    if (filters.country && p.nationality !== filters.country) return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.language && !p.languages.some((l) => l.toLowerCase().includes(filters.language.toLowerCase()))) return false;
    if (filters.ageMin) {
      const min = parseInt(filters.ageMin, 10);
      if (p.age < min) return false;
    }
    if (filters.ageMax) {
      const max = parseInt(filters.ageMax, 10);
      if (p.age > max) return false;
    }
    if (filters.experience) {
      const hasYears = /\d+/.test(p.experience);
      if (filters.experience === 'none' && hasYears) return false;
      if (filters.experience === '1+' && !hasYears) return false;
    }
    if (filters.drivingLicense === 'yes' && !p.drivingLicense) return false;
    if (filters.drivingLicense === 'no' && p.drivingLicense) return false;
    if (filters.availability && !p.availability.toLowerCase().includes(filters.availability.toLowerCase())) return false;
    return true;
  });
}
