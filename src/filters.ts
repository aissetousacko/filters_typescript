import * as fs from "fs";

// Type pour User
type User = {
  name: string;
  age: number;
};

// Type pour le filtre
type Filter = {
  name?: string;  //Filtres facultatifs
  age?: number;
};

// Filter part 1 

// La fonction prends en paramètres une liste d'utilisateurs (User) et un objet de filtres(Filter) 
//et retourne un tableau contenant un objet
function filterPart1(users: User[], filters: Filter): User[] {
  const logs = filterpart3Logs(filters)
  console.log("query logs")
  console.log(logs)


  let result = users.filter(user => {
    // Si un filtre est défini, on doit vérifier si le filtre correspond à l'user
    // Dans le cas contraire on l'ignore
    return (
      (filters.name === undefined || user.name === filters.name) &&
      (filters.age === undefined || user.age === filters.age)
    );
  });

  return result
}


const users: User[] = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "John", age: 20 },
  { name: "Bob", age: 25 },
];

const filters: Filter = { name: "John", age: 25 };
const filters2: Filter = { name: "Alice"};

const filteredUsers = filterPart1(users, filters);
console.log("filteredUsers :");
console.log(filteredUsers);

// Filters part 2

// On utilise fs pour lire le fichier json et retourner un tableau d'objets contenant la liste des utilisateurs
function filterPart2Load(filePath: string): User[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as User[];
}

// Chemin vers le fichier JSON
const filePath = "src/users.json"; 
const usersFromFile = filterPart2Load(filePath);
// console.log(`usersFromFile: ${usersFromFile.map((data: any )=> console.log(data))}`)
// console.table(usersFromFile)
//Puisque le fichier a été transformé en un tableau d'objets de type User, on peut utiliser la fonction de la partie 1
const filteredUsersFromFile = filterPart1(usersFromFile, filters2);
console.log("filteredUsersFromFile :");
console.log(filteredUsersFromFile);


// Filter part 3
// On prend en paramètres le filtre et on retourne la phrase qui contient le log sous format SQL
function filterpart3Logs(filters: Filter): string {
  const conditions: string[] = [];

  //Si le name est défini, on assigne le name
  if (filters.name !== undefined) {
    conditions.push(`"name" = "${filters.name}"`);
  }

  //Si l'âge est défini, on assigne l'âge
  if (filters.age !== undefined) {
    conditions.push(`"age" = ${filters.age}`);
  }

  // Si il y a plusieurs filtres, on affiche "AND"; sinon on affiche le filtre seul
  return `Filter : WHERE ${conditions.join(" AND ")}`;
}
