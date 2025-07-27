import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primaryClassName: 'bg-yellow-500 text-white hover:bg-amber-500',
  secondaryClassName: 'bg-emerald-900 text-white hover:bg-emerald-700',
  primaryOnDarkClassName: 'bg-white hover:bg-emerald-50 text-gray-700',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex items-center rounded-full gap-2.5 justify-center px-7 py-3 text-md font-semibold leading-none outline-offset-2 transition-all duration-200 ease-in-out active:transition-none',
    variantStyles[`${variant}ClassName`],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
