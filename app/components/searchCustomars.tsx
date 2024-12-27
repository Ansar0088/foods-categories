'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchCustomers } from "@/lib/api"

interface SearchCustomersProps {
  onSelectCustomer: (customer: { name: string; phone: string; address: string }) => void;
}

export default function SearchCustomers({ onSelectCustomer }: SearchCustomersProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [customers, setCustomers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<{ name: string; phone: string; address: string } | null>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        setLoading(true)
        fetchCustomers(searchTerm).then((data) => {
          setCustomers(data)
          setLoading(false)
        })
      } else {
        setCustomers([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    })
    onSelectCustomer(customer)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-96 justify-between"
        >
          {selectedCustomer ? selectedCustomer.name : "Select Customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 border-0 focus-visible:ring-0"
          />
        </div>
        <ScrollArea className="h-[300px] p-1">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <p className="text-sm text-muted-foreground">No customers found</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {customers.map((customer) => (
                <Button
                  key={customer.id}
                  variant="ghost"
                  role="option"
                  onClick={() => handleSelectCustomer(customer)}
                  className={cn(
                    "w-full justify-start space-x-2 rounded-sm px-2 py-1.5",
                    selectedCustomer?.name === customer.name && "bg-accent"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {customer.image}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Mobile #: {customer.phone}
                    </span>
                  </div>
                  {selectedCustomer?.name === customer.name && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

