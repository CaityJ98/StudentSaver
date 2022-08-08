const baseUrl = "http://localhost:5000";

export async function getAll(page, category, query) {
  if (query !== "" && query !== undefined) {
    // below to change search on category - add category to url
    const res = await fetch(`${baseUrl}/listings/paginate?page=${page}&search=${query}`, {
      credentials: "include"
    })
    return res.json();
  } else if (category && category !== "all") {
    const res = await fetch(
      `${baseUrl}/listings/paginate?category=${`${category.charAt(0).toUpperCase()}${category.slice(1)}`}&page=${page}`,
      {
        credentials: "include"
      }
    )
    return res.json();
  } else {
    const res = await fetch(`${baseUrl}/listings/paginate?page=${page}`, {
      credentials: "include"
    })
    return res.json();
  }
}

export async function getSpecific(id) {
  const response = await fetch(`${baseUrl}/listings/specific/${id}`, {
    credentials: "include"
  });
  return response.json();
}

export async function createListing(listing) {
  const response = await fetch(`${baseUrl}/listings/add-listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(listing)
  });

  return response.json();
}

export async function removeListing(id, listing) {
  const response = await fetch(`${baseUrl}/listings/remove/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(listing)
  });
  console.log(response)
  return response.json();
}

export async function editListing(id, listing) {
  const response = await fetch(`${baseUrl}/listings/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(listing)
  });
  // console.log(response);

  return response.json();
}

export async function activateSell(id) {
  return (await fetch(`/listings/enable/${id}`)).json();
}

export async function archiveSell(id) {
  return (await fetch(`/listings/archive/${id}`)).json();
}
